// Execption when user not found
/**
 * @extends Error
 */
class DataNotFound extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.code = 404;
    this.message = 'Error: ' + message || 'Data not found!';
  }
}

module.exports = DataNotFound;
