const Role = require("../models/roles");

const roleController = {
    register: async (Request, Response) => {
        const admin = {
            type_role: "3",
            role: "admin"
        }
        const user = {
            type_role: "0",
            role: "user"
        }
        try {
            const role = await Role.create({
                type_role: "0",
                role: "user"
            });
            Response.json('created !')
        }catch(err) {
            Response.json(err.message)
        }
    }
    

}
module.exports = roleController;