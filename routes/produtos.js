import express from 'express';
const router = express.Router();

export default (supabase) => {

  // Listar todos os produtos
  router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  });

  // Obter um produto por ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: 'Produto não encontrado' });
    return  res.json(data);
  });

// Criar um novo produto
  router.post('/', async (req, res) => {
    const { nome, preco } = req.body;
    const { data, error } = await supabase.from('produtos').insert([{ nome, preco }]);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({mensagem: "Produto adicionado com sucesso!"});
  });

  // Atualizar um produto
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const { data, error } = await supabase.from('produtos').update({ nome, preco }).eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({mensagem: "Produto atualizado com sucesso!"});
  });


  // Deletar um produto
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('produtos').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({mensagem: 'Produto apagado com sucesso!'});
  });

  return router;
};




