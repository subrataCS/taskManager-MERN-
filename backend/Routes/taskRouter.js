const express = require('express')
const { createTask, fetchAllTask, updateTaskbyId, deleteTaskbyId } = require('../controllers/taskController')
const router=express()


router.get('/',fetchAllTask)
router.post('/',createTask)
router.put('/:id',updateTaskbyId)
router.delete('/:id',deleteTaskbyId)



module.exports=router;