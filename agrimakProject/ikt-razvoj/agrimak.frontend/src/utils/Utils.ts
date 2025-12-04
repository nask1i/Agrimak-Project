import axios from "axios";
import { User } from "../types/user";

export class HttpHelpers {
  static axiosInstance = axios.create({
    baseURL: "https://localhost:44353/",
    withCredentials: true,
  });

  static post(relativeURL: string, model: any): Promise<any> {
    return this.axiosInstance.post(relativeURL, model).catch((error) => {
      this.handleError(error);
      throw error;
    });
  }

  static postFormData(relativeURL: string, formData: FormData): Promise<any> {
    return this.axiosInstance
      .post(relativeURL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((error) => {
        this.handleError(error);
        throw error;
      });
  }

  static get(relativeUrl: string): Promise<any> {
    return this.axiosInstance.get(relativeUrl).catch((error) => {
      this.handleError(error);
      throw error;
    });
  }

  private static handleError(error: any) {
    console.log(error);
    const response = error.response;
    if (response) {
      if (
        (response.status == "401" || response.status == "403") &&
        !window.location.href.includes("login")
      ) {
        UserHelpers.resetLogedInUser();
        window.location.href = "/";
      }
    }
  }
}

export class UserHelpers {
  static setUser(user: User) {
    if(!user)
      return;
    localStorage.setItem("user", JSON.stringify(user));
  }

  static getLogedInUser(): User | null {
    const localData = localStorage.getItem("user");
    if (!localData || localData === "") return null;

    const model = JSON.parse(localData);
    return new User(model);
  }

  static resetLogedInUser(): void {
    localStorage.removeItem("user");
  }
}
