import axios from "axios";
import base_url from "../config";
// :white_check_mark: GET all customers
export const GetAllCustomers = async () => {
  try {
    const response = await axios.get(`${base_url}/Customers/GetAllCustomers`);
    console.log(":white_check_mark: GetAllCustomers Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(":x: GetAllCustomers Error:", error);
    throw error;
  }
};
// :white_check_mark: GET customer by ID
export const GetCustomersByCustomerId = async (id) => {
  try {
    const response = await axios.get(`${base_url}/Customers/GetCustomersByCustomerId/${id}`);
    console.log(":white_check_mark: GetCustomersByCustomerId Response:", response.data);
    return response.data.ResultSet || [];
  } catch (error) {
    console.error(":x: Error fetching customer:", error);
    throw error;
  }
};
// :white_check_mark: ADD new customer
export const AddCustomersDetails = async (customer) => {
  try {
    const response = await axios.post(`${base_url}/Customers/AddCustomersDetails`, customer);
    console.log(":white_check_mark: AddCustomersDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(":x: Error adding customer:", error);
    throw error;
  }
};
// :white_check_mark: UPDATE customer
export const PutCustomersDetails = async (customer) => {
  try {
    const response = await axios.post(`${base_url}/Customers/PutCustomersDetails`, customer);
    console.log(":white_check_mark: PutCustomersDetails Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(":x: Error updating customer:", error);
    throw error;
  }
};
// :white_check_mark: Export all functions as default object
export default {
  GetAllCustomers,
  GetCustomersByCustomerId,
  AddCustomersDetails,
  PutCustomersDetails,
};







