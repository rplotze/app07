import express from 'express';
import dotenv from 'dotenv';
import {createClient} from '@supabase/supabase-js';
import cors from 'cors';
import produtosRoutes from './routes/produtos.js';

dotenv.config();

const app = express();
app.use(cors());
const porta = 3000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.use(express.json());
app.use('/produtos', produtosRoutes(supabase));

app.get('/',(req,res)=>{
    res.send('API Produtos com Express e Supabase');
});

app.listen(porta,()=>{
    console.log('API rodando na porta 3000');
});