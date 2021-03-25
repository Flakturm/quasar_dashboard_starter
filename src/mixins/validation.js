export default {
  methods: {
    isRequired(val) {
      return !!val || '必填'
    },

    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Email 格式錯誤'
    },

    isValidPassword(val) {
      return (val.length >= 8 && val.length <= 20) || '最少 8 碼, 最多 20 碼'
    }
  }
}
