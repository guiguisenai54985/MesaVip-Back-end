const connection = require("../config/db");

const userModel = {
    //buscar todos os user 
    getAllUsers: async () => {
        const [result] = await connection.query("SELECT * FROM usuarios")
            .catch(erro => console.log(erro));
        return result
    },
    //buscar todas as noticias
    getAllNews: async () => {
        const [result] = await connection.query("SELECT * FROM noticia")
            .catch(erro => console.log(erro));
        return result
    },
    //buscar noticia por id
    getByIdNews: async (id) => {
        const [result] = await connection.query("SELECT * FROM noticia WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },
    //buscar por email id
    getByEmail: async (email) => {
        const [result] = await connection.query("SELECT * FROM usuarios WHERE email =?", [email])
            .catch(erro => console.log(erro));
        return result
    },
    //buscar treinos id
    getByID: async (id) => {
        const [result] = await connection.query("SELECT * FROM treinos WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },
    //buscar usuario id
    getByIDUser: async (id) => {
        const [result] = await connection.query("SELECT * FROM usuarios WHERE id =?", [id])
            .catch(erro => console.log(erro));
        return result
    },
    getByIDTreino: async (id) => {
        const [result] = await connection.query("SELECT * FROM treinos WHERE id_usuario =?", [id])
            .catch(erro => console.log(erro));
        return result
    },
    //registrar usuario
    registerUser: async (id, nome, sobrenome, email, senha, imagem ) => {
        try{
            const result = await connection.query('INSERT INTO usuarios (id,nome,sobrenome,email,senha,imagem) VALUES(?,?,?,?,?,?)',[id,nome,sobrenome,email,senha,imagem])
            return result;
        }
        catch(error) {
            console.log('Erro ao registrar o usuário com a imagem', error);
            throw new Error('Erro ao registrar o usuário')
        }
    },
    //cadastrar treino
    addWorkout: async (id, workoutType, exerciciosInput, workoutFrequency, id_usuario) => {
        const [result] = await connection.query("INSERT INTO treinos values(?,?,?,?,?)", [id, workoutType, exerciciosInput, workoutFrequency, id_usuario])
            .catch(erro => console.log(erro));
        return result;
    },
    //validar login
    validateLogin: async (email, senha) => {
        const [result] = await connection.query("SELECT * FROM usuarios WHERE email=? AND senha =?", [email, senha])
            .catch(erro => console.log(erro));
        return result
    },
    //email para resetar senha 
    resetByEmail: async (email) => {
        const [result] = await connection.query('select * from usuarios where email=?', [email])
        return result;
    },

    //update the password
    updatePassword: async (email, senha) => {
        const result = await connection.query('update usuarios set senha=? where email=?', [senha, email])
            .catch(erro => console.log(erro));
        return result;
    },
    //atualizar info
    updateInfo: async (nome, sobrenome, email, id) => {
        const result = await connection.query('update usuarios set nome=?, sobrenome=?, email=? where id=?', [nome, sobrenome, email, id])
            .catch(erro => console.log(erro));
        return result;
    },
    //atualizar foto
    updateUser: async(id, imagem)=>{
        const[result] = await connection.query("UPDATE usuarios SET imagem =?, WHERE id=?",[imagem, id])
        .catch(erro => console.log(erro));
        return result;
    },
    //registrar foto
    registerImage: async (id, imagem ) => {
        try{
            const result = await connection.query('UPDATE usuarios set imagem=? WHERE id=?',[imagem, id])
            return result;
        }
        catch(error) {
            console.log('Erro ao registrar o usuário com a imagem', error);
            throw new Error('Erro ao registrar o usuário')
        }
    },
    //deletar pedidos/treino
    removeWorkout: async (id) => {
        const [result] = await connection.query(
            "DELETE FROM treinos WHERE id = ?",
            [id]
        ).catch(err => console.log(err));
        return result;
    },

    
};

module.exports = userModel;