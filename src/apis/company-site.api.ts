import { request } from '../common/request';

export const fetchCompanySiteListApi = async () => {
  try {
    const response = await request('GET', `/company-site`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanySiteByIdApi = async (id: string) => {
  try {
    const response = await request('GET', `/company-site/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createCompanySiteApi = async (payload: any) => {
  try {
    const response = await request('POST', `/company-site`, payload, true);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCompanySiteApi = async (company: any) => {
  try {
    const response = await request('PUT', `/company/${company?.id}`, {
      name: company?.name,
      email: company?.email,
      password: company?.password,
      status: company?.status == 1 ? 0 : 1,
      assign_alias: company?.assign_alias,
      additional_info: company?.additional_info,
      dob: company?.dob,
      address: company?.address,
      contact_number: company?.contact_number,
      certificate: company?.certificate,
      certificate_expire_date: company?.certificate_expire_date,
      employee_number: company?.employee_number
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCompanySiteApi = async ({ id, data }: any) => {
  try {
    const response = await request('POST', `/company/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};
