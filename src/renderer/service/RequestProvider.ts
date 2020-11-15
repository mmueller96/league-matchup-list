import Axios, { AxiosResponse } from "axios";
import { ResponseContent } from "../store/types";

export class RequestProvider {
	private host: string;
	private typeOfAPI: string;

	constructor(host: string, typeOfAPI: string) {
		this.host = host;
		this.typeOfAPI = typeOfAPI;
	}

	public async makePostRequest(version: string, path: string, query?: FormData | object): Promise<ResponseContent> {
		let url = 'http://' + this.host + '/' + this.typeOfAPI + '/' + version + path;
		let data: ResponseContent = {}
		await Axios.post(url, query, {
			headers: { 'Content-Type': 'multipart/form-data' }
		}).then((respo: AxiosResponse<any>) => data = respo.data as ResponseContent);
		return data;
	}

	public async makeGetRequest(version: string, path: string): Promise<any> {
		let url = 'http://' + this.host + '/' + this.typeOfAPI + '/' + version + path;
		let data: ResponseContent = {}
		await Axios.get(url)
			.then((respo: AxiosResponse<any>) => data = respo.data as ResponseContent);
		return data;
	}

	public static genURL(path: any[]): string {
		let str: string = "";
		path.forEach((elem: any) => {
			str += '/' + elem as String
		});
		return str;
	}
}