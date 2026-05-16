export class ValidationError extends Error {
  public readonly fields: string[];

  constructor(message: string, fields: string[]) {
    super(message);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}
