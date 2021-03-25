export default {
  data() {
    return {
      items: [],
      loading: false,
      pagination: {
        filter: '',
        rowsPerPage: 10,
        rowsNumber: 10,
        descending: true,
        sortBy: 'id'
      }
    }
  },

  methods: {
    loadRequest() {
      this.onRequest({
        pagination: this.pagination
      })
    },

    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      this.pagination.page = page
      this.pagination.rowsPerPage =
        rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending
      this.fetchItems()
    }
  }
}
