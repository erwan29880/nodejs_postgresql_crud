const conn = require('./conn');
const escape = require('escape-html');

/*
CRUD
const bdd = require('./bddMysql/requetes');
const mysqlc = new bdd();
mysqlc.insertInitialData();
mysqlc.insertData({prenom: "jacques", nom: "dupre", montant: 200});
mysqlc.updateData({prenom: "jacques", nom: "dupre", montant: 200});
mysqlc.deleteData({prenom: "jacques", nom: "dupre"});
mysqlc.getDataSelected({prenom: "jacques", nom: "dupre"}).then(console.log)
mysqlc.getData().then(console.log)
*/


class Requetes {

    /**
     * insertion de données intiales
     */
    insertInitialData() {
        const initialRequete = "create table if not exists data(id serial, prenom VARCHAR(20), nom VARCHAR(20), montant INT);";
        const insertRequete = "insert into data(prenom, nom, montant) values ($1, $2, $3);";
        const data = [
            ['martin', 'dupont', 100],
            ['jean', 'dubois', 120],
            ['edmond', 'duval', 110]
        ];

        conn.query(initialRequete, (err) => {
            if (err) throw err;
        });

        for (let row of data) {
            conn.query(insertRequete, row, (err) => {
                if (err) throw err;
            });
        }
    }

    /**
     * get all data
     * @returns {promise}
     */
    async getData() {
        const promise = new Promise((resolve) => {
            conn.query("select prenom, nom, montant from data;", (err, result) => {
                if (err) throw err;
                resolve(result.rows);
            })
        });

        return promise.then(val => val);
    }

    /**
     * insert in table prenom, nom, montant
     * @param {object} obj 
     */
    insertData(obj) {
        const requete = "insert into data (prenom, nom, montant) values ($1, $2, $3);";
        const data = [
            escape(obj.prenom),
            escape(obj.nom),
            parseInt(escape(obj.montant))
        ];
        conn.query(requete, data, (err) => {
            if (err) throw err;
        });
    }

    /**
     * get data by prenom nom
     * @param {object} obj 
     * @returns {promise}
     */
    async getDataSelected(obj) {
        const requete = "select prenom, nom from data where prenom=$1 and nom=$2;";
        const data = [
            escape(obj.prenom),
            escape(obj.nom)
        ];
        const promise = new Promise((resolve) => {
            conn.query(requete, data, (err, result) => {
                if (err) throw err;
                resolve(result.rows);
            })
        });

        return promise.then(val => val);
    }

    /**
     * update montant
     * @param {object} obj 
     */
    async updateData(obj) {
        const result = await this.getDataSelected(obj);
        if (result.length === 0) return;
        console.log("ok")
        const requete = "update data set montant=$1 where prenom=$2 and nom=$3;";
        const data = [
            parseInt(escape(obj.montant)),
            escape(obj.prenom),
            escape(obj.nom)
        ];
        conn.query(requete, data, (err) => {
            if (err) throw err;
        });
    }

    /**
     * delete data by prenom nom
     * @param {object} obj 
     * @returns 
     */
    async deleteData(obj) {
        const result = await this.getDataSelected(obj);
        if (result.length === 0) return;
        const requete = "delete from data where prenom=$1 and nom=$2;";
        const data = [
            escape(obj.prenom), 
            escape(obj.nom)
        ];
        conn.query(requete, data, (err) => {
            if (err) throw err;
        });
    }
}

module.exports = Requetes;