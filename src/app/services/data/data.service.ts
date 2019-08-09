import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NELLIE_API_URL } from '@app/config';
import { Instance, Decision, Feature, FetchOptions, FeaturesPage, DecisionsPage } from './data.models';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

  instances(): Promise<Instance[]> {
    return this.http.get<Instance[]>(`${NELLIE_API_URL}/data`).toPromise();
  }

  features(): Promise<Feature[]> {
    return this.http.get<Feature[]>(`${NELLIE_API_URL}/features`).toPromise();
  }

  featuresPage(params = {}): Promise<FeaturesPage> {
    const url = `${NELLIE_API_URL}/admin/features`;
    return this.http.get<FeaturesPage>(url, { params }).toPromise();
  }

  decisions(): Promise<Decision[]> {
    return this.http.get<Decision[]>(`${NELLIE_API_URL}/decisions`).toPromise();
  }

  decisionsPage(params = {}): Promise<DecisionsPage> {
    const url = `${NELLIE_API_URL}/admin/decisions`;
    return this.http.get<DecisionsPage>(url, { params }).toPromise();
  }

  async composedData() {
    const instances: Instance[] = await this.instances();
    const features: Feature[] = await this.features();
    const decisions: Decision[] = await this.decisions();

    return instances.map(instance => ({
      label: decisions.find(item => item.id === instance.label),
      features: instance.features.map(feature => features.find(item => item.id === feature)),
    }));
  }

  autocompleteFeatures(phrase: string): Promise<Feature[]> {
    const params = { phrase };
    const url = `${NELLIE_API_URL}/features/autocomplete`;
    return this.http.get<Feature[]>(url, { params }).toPromise();
  }

  updateFeature(id, body): Promise<Feature> {
    return this.http.put<Feature>(`${NELLIE_API_URL}/features/${id}`, body).toPromise();
  }
}
