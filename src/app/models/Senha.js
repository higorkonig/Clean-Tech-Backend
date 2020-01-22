import Sequelize, {Model} from 'sequelize';
import bcrypt from "bcryptjs";

class Senha extends Model {
    static init(sequelize) {
        super.init(
            {
                hash: Sequelize.STRING,
                expira: Sequelize.DATE,
                id_prestador: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );

        return this;
    }


}

export default Senha;
