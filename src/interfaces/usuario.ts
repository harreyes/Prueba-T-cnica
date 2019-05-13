export class UsuarioInterfaz {
    private birthdate: any;
    private firstname: any;
    private lastname: any;
    private identification: any;


    constructor(birthdate, firstname, lastname, identification) {
        this.birthdate = birthdate;
        this.firstname = firstname;
        this.lastname = lastname;
        this.identification = identification;
    }
}