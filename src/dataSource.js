import { RESTDataSource } from "@apollo/datasource-rest";
import camelcaseKeys from "camelcase-keys";

const ACCESS_KEY = "1163e652bdae6374b42598e4787058ab";
const API_URL = "https://api.openweathermap.org/data/2.5/";

export class WheatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
    this.token = ACCESS_KEY;
  }

  willSendRequest(_path, request) {
    request.params.set("appid", this.token);
  }

  async getCityById(id) {
    const data = await this.get("weather", {
      params: {
        id,
      },
    });

    return camelcaseKeys(data, { deep: true });
  }

  async getCities(idArr) {
    const data = await Promise.all(
      idArr.map((id) => this.getCityById(id)).flat()
    );

    return camelcaseKeys(data, { deep: true });
  }

  async withCity(city) {
    const data = await this.get("weather", {
      params: {
        q: city,
      },
    });
    return camelcaseKeys(data, { deep: true });
  }
}

export const dataSources = () => ({ weatherAPI: new WheatherAPI() });
