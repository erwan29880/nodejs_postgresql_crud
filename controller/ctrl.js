const express = require('express');
const psqlModule = require('../bddPostgresql/requetes');


exports.psql = (req, res) => {
    res.render("psql");
};

exports.psqlGet = (req, res) => {
    const bdd = new psqlModule();
    bdd.getData()
    .then((rows) => res.status(200).json(rows));
};

exports.psqlPost = async (req, res, next) => {
    const bdd = new psqlModule();
    bdd.insertData(req.body);
};

exports.psqlPut = async (req, res) => {
    const bdd = new psqlModule();
    bdd.updateData(req.body)
    .then(res.status(200).json({message: "ok"}));
};

exports.psqlDel = async (req, res) => {
    const bdd = new psqlModule();
    console.log(req.body)
    bdd.deleteData(req.body)
    .then(res.status(200).json({message: req.body}));
};