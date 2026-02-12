import bcrypt from 'bcrypt';

const user = [
    {
        name:"Admin",
        email:"admin@gmail.com",
        password:await bcrypt.hash("1234567",10),
        isAmin:true
    },{
        name:"Mohan",
        email:"Mohan@gmail.com",
        password:await bcrypt.hash("1234567",10),
        isAmin:false
    },{
        name:"raj",
        email:"raj@gmail.com",
        password:await bcrypt.hash("1234567",10),
        isAmin:false
    }
]

export default user;