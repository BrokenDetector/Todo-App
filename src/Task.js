class Task {
  constructor(id, name, date) {
    this.id = id,
      this.name = name,
      this.date = date
  }

  /*
    getDateFormatted() {
      const day = this.date.split('-')[1]
      const month = this.date.split('-')[2]
      const year = this.date.split('-')[0]
      return `${month}/${day}/${year}`
    }
  */
}

export { Task }
