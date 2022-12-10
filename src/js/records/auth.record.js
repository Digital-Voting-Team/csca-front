export class AuthRecord {
  constructor(record) {
    this.id = record.id;
    this.user_id = record.relationships.user.data.id;
    this.jwt = record.attributes.jwt;
  }
}
