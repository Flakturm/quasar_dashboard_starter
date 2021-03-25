export default {
  data() {
    return {
      trashedItems: [],
      trashedItemsLoading: false,
      trashedItemsPagination: {
        filter: '',
        rowsPerPage: 10,
        rowsNumber: 10,
        descending: true,
        sortBy: 'id',
        trashed: true
      }
    }
  },

  methods: {
    loadRequest() {
      this.onRequest({
        pagination: this.trashedItemsPagination
      })
    },

    onRequest(props) {
      const {
        page,
        rowsPerPage,
        sortBy,
        descending
      } = props.trashedItemsPagination
      this.trashedItemsPagination.page = page
      this.trashedItemsPagination.rowsPerPage =
        rowsPerPage === 0 ? this.trashedItemsPagination.rowsNumber : rowsPerPage
      this.trashedItemsPagination.sortBy = sortBy
      this.trashedItemsPagination.descending = descending
      this.fetchTrashedItems()
    }
  }
}
