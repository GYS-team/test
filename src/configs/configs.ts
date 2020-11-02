import { CommonConfigs } from "./configs.declares";

const commonConfigs: CommonConfigs = {
  scheme: "http",
  host: "localhost",
  port: 9000,
};

const configs: any = {
  ...commonConfigs,
  addr: function () {
    return `${this.scheme}://${this.host}${
      this.port != null ? `:${this.port}` : ""
    }`;
  },
};

export default configs