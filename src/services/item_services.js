import _http from '../_http';

const AdminLoanServices = {
  getAll: (request) => {
    const { pagination, query } = request;
    const requestUrl = '/api/admin/v1/loans/active';
    const params = {
      page: pagination.current - 1,
      limit: pagination.pageSize,
      query: query,
    };
    return _http.get(requestUrl, params);
  },
  getLoanById: (id) => {
    const requestUrl = `/api/admin/v1/loans/${id}`;
    return _http.get(requestUrl);
  },

  getLoansHistory: (request) => {
    const { userId, pagination } = request;
    const requestUrl = `/api/admin/v1/loans/history/${userId}`;
    const params = {
      page: pagination.current - 1,
      limit: pagination.pageSize,
    };
    return _http.get(requestUrl, params);
  },

  getLoansByUser: (request) => {
    const { userId, pagination } = request;
    const requestUrl = `/api/admin/v1/loans/all-loans/${userId}`;
    const params = {
      page: pagination.current - 1,
      limit: pagination.pageSize,
    };
    return _http.get(requestUrl, params);
  },

  getActiveLoanByBankAccount: (data) => {
    const { bankOption, accountNumber } = data;
    const requestUrl = '/api/admin/v1/loans/by-bank-account';
    const params = {
      bankOption,
      accountNumber,
    };
    return _http.get(requestUrl, params);
  },

  getAllLateLoans: (request) => {
    const { pagination, query } = request;
    const requestUrl = '/api/admin/v1/loans/late';
    const params = {
      page: pagination.current - 1,
      limit: pagination.pageSize,
      query: query,
    };
    return _http.get(requestUrl, params);
  },
};

export default AdminLoanServices;
