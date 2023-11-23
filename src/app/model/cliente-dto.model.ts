export class ClienteDTO {
    constructor(
        public id: number,
        public sharedKey: string,
        public bussinessId: string,
        public email: string,
        public phone: number,
        public startDate: string,
        public endDate: string,
        public creationDate: string) { }
}
