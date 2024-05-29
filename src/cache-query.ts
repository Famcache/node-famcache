type QueryStatus = 'OK' | 'ERROR';

class CacheQuery {
  public id: string;
  private status: QueryStatus;

  public data?: string;

  static fromString(data: string): CacheQuery {
    const [id, status, ...rest] = data.split(' ');

    return new CacheQuery(id, status as QueryStatus, rest.join(' '));
  }

  constructor(id: string, status: QueryStatus, data: string) {
    this.id = id;
    this.status = status;
    this.data = data;
  }

  isOk() {
    return this.status === 'OK';
  }

  isError() {
    return this.status === 'ERROR';
  }
}

export default CacheQuery;
