import axios from 'axios';

/*
export interface IGMSupplyApiOptions {
    baseUrl: string;
}

export interface IGetGMSupplyResult {
    avalancheCirculatingSupply: number
    avalancheTotalSupply: number
    bscCirculatingSupply: number 
    bscTotalSupply: number
    ethereumCirculatingSupply: number
    ethereumTotalSupply: number
    n3CirculatingSupply: number
    n3TotalSupply: number
    phantasmaCirculatingSupply: number
    phantasmaTotalSupply: number
    polygonCirculatingSupply: number
    polygonTotalSupply: number
    baseCirculatingSupply: number
    baseTotalSupply: number
    allCirculatingSupply: number
    allTotalSupply: number
} */

export class GMSupplyApi {
  constructor(options) {
    this.options = options;
  }

  async getGMSupply() {
    const url = `${this.options.baseUrl}/gmSupply`;
    const res = await axios.get(url, { params: {} });
    return res.data;
  }
}
