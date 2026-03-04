;(function () {
  if (!Number.prototype.toFixedMax) {
    Number.prototype.toFixedMax = function toFixedMax(digits) {
      return Number(+parseFloat(String(this)).toFixed(digits))
    }
  }

  if (!String.prototype.templateReplace) {
    String.prototype.templateReplace = function templateReplace(values) {
      return this.replace(/\{([^\{]+)\}/g, (_unused, key) => {
        return values[key]
      })
    }
  }

  if (!String.prototype.truncate) {
    String.prototype.truncate = function truncate(max) {
      return this.length > max ? this.substring(0, max) + '...' : this
    }
  }

  if (!Array.prototype.unique) {
    Array.prototype.unique = function () {
      return Array.from(new Set(this.map((obj) => JSON.stringify(obj)))).map(
        (str) => JSON.parse(str)
      )
    }
  }

  if (!String.prototype.take) {
    String.prototype.take = function take(length) {
      return this.substring(0, length)
    }
  }

  if (!String.prototype.includesFuzzy) {
    String.prototype.includesFuzzy = function includesFuzzy(
      searchStr,
      fuzziness = 0
    ) {
      const calculateLevenshtein = (a, b) => {
        if (a.length === 0) return b.length
        if (b.length === 0) return a.length

        const matrix = []
        for (let i = 0; i <= b.length; i++) matrix[i] = [i]
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j

        for (let i = 1; i <= b.length; i++) {
          for (let j = 1; j <= a.length; j++) {
            const cost = a[j - 1] === b[i - 1] ? 0 : 1
            matrix[i][j] = Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + cost
            )
          }
        }
        return matrix[b.length][a.length]
      }

      return this.split(' ').some(
        (word) =>
          calculateLevenshtein(
            word.take(searchStr.length).toLowerCase(),
            searchStr.toLowerCase()
          ) <= fuzziness
      )
    }
  }

  if (!String.prototype.caseTitle) {
    String.prototype.caseTitle = function () {
      return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    }
  }
})()
