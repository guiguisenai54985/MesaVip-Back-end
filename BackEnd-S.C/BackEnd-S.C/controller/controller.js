const { json } = require("express");
const clientController = require("../model/model");

const userController = {

    //route root
    getRoot: async (req, res) => {
        res.status(200).json({ msg: "The API is running!!!" })
    },
    //Controller para listar todos os usuários do banco
    listAllUsers: async (req, res) => {
        try {
            const clients = await clientController.getAllUsers();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de usuários" })
        }
    },
    listAllNews: async (req, res) => {
        try {
            const clients = await clientController.getAllNews();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },
    listNewsbyID: async (req, res) => {
        try {
            const sql = await clientController.getByIdNews(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de noticias" })
        }
    },

    //Controller para listar usuários por ID
    listByEmail: async(req,res)=>{
        try{
            const sql = await clientController.getByEmail(req.params.email);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este email"})
            }
        }
        catch(error){
            return error
        }   
    },
    listByID: async(req,res)=>{
        try{
            const sql = await clientController.getByIDUser(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch(error){
            return error
        }   
    },
    listByIDTreino: async(req,res)=>{
        try{
            const sql = await clientController.getByIDTreino(req.params.id);

            if(sql.length> 0)
            {
                res.status(200).json(sql)
            }
            else{
                res.status(401).json({msg:"Não existe registro no banco com este id"})
            }
        }
        catch(error){
            return error
        }   
    },

    //Criar um novo usuário
    createNewUser: async(req,res) => {
        try{
            const{id, nome, sobrenome, email, senha, imagemBase64} = req.body;
            console.log (req.body)

            const sql = await clientController.getByEmail(email);

            if(sql.length > 0) {
                res.status(401).json({msg: 'O email já existe no banco de dados'});


            }

            else{
                await clientController.registerUser(id,nome, sobrenome,email,senha, imagemBase64);
                 res.status(201).json({msg: 'Usuário cadastrado com sucesso'});
            }
        } catch(error){
            console.error('Erro ao registrar usuário com a imagem', error);
            return res.status(500).json({msg:'Erro no servidor'})
        }
    },

    login: async(req,res) => {
        let {email,senha} = req.body;

        try{
            const sql = await clientController.validateLogin(email,senha);
            

            if(sql.length > 0 && sql[0].senha === senha) {
                res.status(200).json(sql[0]);
              
            }

            else{
                res.status(401).json({msg:"Email ou senha incorretos"});
            }
        }
        catch(error) {
            if(error) {
                console.log(error)
                res.status(500).json(error);
            }
        }
    },


    addWorkout: async(req,res)=>{
        const {id,workoutType,exerciciosInput,workoutFrequency,id_usuario} = req.body;

        console.log(req.body);

        try{
            const sql = await clientController.getByID(id);

            console.log(sql);

            if(sql.length > 0){
                res.status(401).json({msg: "O id já esta cadastrado no Banco de Dados"})
            }
            else{
                await clientController.addWorkout(id, workoutType,exerciciosInput,workoutFrequency,id_usuario);
                res.status(201).json({msg:"Treino cadastrado com sucesso"});
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    },

    //controller para o reset
    getByEmailReset: async (req,res)=>{
        let {email} = req.body

        email = email.toLowerCase();

        try{
            const sql = await clientController.getByEmail(email);

            if(sql.length > 0){
                res.status(200).json({msg:'sucess'})
            }
            else{
                res.status(401).json({msg:'email não cadastrado no bd'});
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },

    resetPassword: async (req,res)=>{
        let {email,senha} = req.body

        email = email.toLowerCase();

        try{
            await clientController.updatePassword(email,senha);
            res.status(200).json({msg:'senha atualizada com sucesso'});
        }
        catch(error){
            console.log('erro ao redfinir a senha')
            res.status(500).json({msg:'erro no servidor'})
        }
    },

    resetInfo: async (req,res)=>{
        let {nome, sobrenome, email, id} = req.body

        email = email.toLowerCase();

        try{
            await clientController.updateInfo(nome, sobrenome, email, id);
            res.status(200).json({msg:'senha atualizada com sucesso'});
        }
        catch(error){
            console.log('erro ao redfinir a senha')
            res.status(500).json({msg:'erro no servidor'})
        }
    },


    registerImageProfile: async(req,res) => {
        try{
            let{id, imagemBase64} = req.body;

            console.log(req.body)

                await clientController.registerImage(id, imagemBase64);
                 res.status(201).json({msg: 'Foto de perfil alterada com sucesso'});
            
        } catch(error){
            console.error('Erro ao registrar a imagem', error);
            return res.status(500).json({msg:'Erro no servidor'})
        }
    },

    updateUser: async(req,res)=>{
        const{id, imagemBase64}= req.body;
        try{
            const sql = await clientController.getByID(id)

            if(sql.length > 0){
                await clientController.updateUser(imagemBase64, id)
                res.status(200).json({msg:"Atualizado com sucesso"})
            }
            else{
                res.status(401).json({msg:"O id nao existe na base de dados"})
            }
        }
        catch(erro){
            if(erro){
                res.status(500).json({msg:"Erro no servidor"+erro})
            }
        }
    },
    deleteWorkout: async (req, res) => {
        try {
          const { id } = req.params;
          await clientController.removeWorkout(id);
          res.status(200).json({ msg: "Pedido deletado com sucesso" });
        } catch (error) {
          console.error('Erro ao deletar treino:', error);
          res.status(500).json({ error: "Erro ao deletar o pedido" });
        }
      },
    }

module.exports = userController;