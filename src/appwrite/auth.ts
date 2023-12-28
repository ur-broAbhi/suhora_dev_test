import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

interface credentialsType {
  email: string;
  password: string;
  name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthService {
  client = new Client();
  account: Account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }: credentialsType) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (userAccount) {
      this.login({ email, password });
      return userAccount;
    } else return null;
  }
  async login({ email, password }: LoginCredentials) {
    return await this.account.createEmailSession(email, password);
  }

  async getCurrentUser() {
    return await this.account.get();
  }

  async logout() {
    await this.account.deleteSessions();
    this.account;
  }
}

const authService = new AuthService();

export default authService;
