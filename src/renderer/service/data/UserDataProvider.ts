import { RequestProvider } from '../RequestProvider';
import * as base64 from 'base-64';
import { ResponseContent } from '../../store/types';

export class UserDataProvider {
	private requestProvider: RequestProvider;

	constructor() {
		this.requestProvider = new RequestProvider('localhost:4000', 'api');
	}

	public async userSignup(email: string, username: string, passwordHash): Promise<ResponseContent> {
		let bodyFormData = new FormData();
		bodyFormData.set('email', email);
		bodyFormData.set('username', username);
		bodyFormData.set('passwordHash', passwordHash);
		return await this.requestProvider.makePostRequest('v1', RequestProvider.genURL(["user"]), bodyFormData);
	}

	public async userValidate(username: string, passwordHash: string): Promise<ResponseContent> {
		let auth = username + ':' + passwordHash;
		let authEncoded = base64.encode(auth);
		return await this.requestProvider.makePostRequest('v1', RequestProvider.genURL(["user", "auth"]), {
			Authorization: 'Basic ' + authEncoded
		})
	}

	public async userFind(username: string): Promise<ResponseContent> {
		return await this.requestProvider.makeGetRequest('v1', RequestProvider.genURL(["user", username]));
	}

	public async userFindRooms(userid: string): Promise<ResponseContent> {
		return await this.requestProvider.makeGetRequest('v1', RequestProvider.genURL(["user", userid, "rooms"]))
	}

	public async userFindSocketID(userid: string): Promise<ResponseContent> {
		return await this.requestProvider.makeGetRequest('v1', RequestProvider.genURL(["user", userid, "socketid"]))
	}

	public async userFindAcceptedFriends(userid: string): Promise<ResponseContent> {
		return await this.requestProvider.makeGetRequest('v1', RequestProvider.genURL(["user", userid, "friends"]))
	}

	public async userFindRequestedFriends(userid: string): Promise<ResponseContent> {
		return await this.requestProvider.makeGetRequest('v1', RequestProvider.genURL(["user", userid, "requested-friends"]))
	}
}