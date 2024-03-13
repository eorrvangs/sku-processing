export default class tabulationMatrix {
    constructor(specification,inventoryArray) {
        this.specification_quantity = specification,
        this.inventoryArray = inventoryArray
        this.all_options_quantity = this.specificationArray();
        this.quantity = this.all_options_quantity.length;
        this.init();
    }
    specificationArray(){
        const newArray = Array.isArray(this.specification_quantity)?this.specification_quantity:Object.entries(this.specification_quantity)
        return newArray.reduce((newArray,item)=>{
        Object.keys(item).find((key)=>{
                if(Array.isArray(item[key])){
                    newArray.push(...Array.from(new Set(item[key])))
                }
            })
        return newArray;
        },[]);
    }
    init() {
        this.matrix_com= Array(this.quantity * this.quantity).fill(0);
        this.initInventoryArray()
    }
    initInventoryArray() {
        const newArray = Array.isArray(this.inventoryArray)?this.inventoryArray:Object.entries(this.inventoryArray)
        newArray.reduce((newArray,item,index)=>{
            Object.keys(item).find((key)=>{
                if(Array.isArray(item[key])){
                    this.fillInArray(Array.from(new Set(item[key])), index + 2);
                }
            })
        return newArray;
        },[]);
        this.initSameLayer()
    }
    initSameLayer() {
        const specsOption = this.getOptional(this.all_options_quantity);
        const newArray = Array.isArray(this.inventoryArray)?this.inventoryArray:Object.entries(this.inventoryArray)
        newArray.reduce((newArray,item,index)=>{
            Object.keys(item).find((key)=>{
                const params = [];
                if(Array.isArray(item[key])){
                    Array.from(new Set(item[key])).map(i=>{
                        if (specsOption.includes(i)) params.push(i);
                    })
                    this.fillInArray(params, 1);
                }
            })
        return newArray;
        },[]);
    }
    getOptional(params) {
        const paramsVertex = params.map((id) => this.getVertexCol(id));
        let collections = [];
        paramsVertex.forEach((col, index) => {
        if (col.some(item =>{ 
            return item !== 0
        })) {
            collections.push(params[index])
        }
        })
        return collections;
    }
    getPublic(params) {
        const paramsVertex = params.map((id) => this.getVertexCol(id));
        let unions = [];
        this.all_options_quantity.forEach((type, index) => {
        const row = paramsVertex.map(col => col[index]).filter(t => t !== 1)
        if (this.itemEqual(row)) {
            unions.push(type)
        }
        })
        return unions;
    }
    itemEqual(params) {
        if (params.includes(0)) return false;
        let weight = -1;
        if (params.length) {
        params.some(t => {
            if (typeof t === 'number'){
            weight = t
            }
            return typeof t === 'number'
        })
        if (weight === -1) {
            return this.isArrayUnions(params)
        }
        }
        return params.every(t => {
        if (typeof t === 'number') {
            return t === weight
        } else {
            return t.includes(weight)
        }
        })
    }
    isArrayUnions(params) {
        if (!params.length) return false;
        return params[0].some(t => {
        return params.every(_t => _t.includes(t))
        })
    }
    getVertexCol(id) {
        const index = this.all_options_quantity.indexOf(id);
        const col = [];
        this.all_options_quantity.forEach((item, pIndex) => {
        col.push(this.matrix_com[index + this.quantity * pIndex]);
        });
        return col;
    }
    fillInArray(params, weight) {
        params.forEach((param) => {
            this.setArrayVertexs(param, params, weight);
        });
    }
    setArrayVertexs(id, sides, weight) {
        const pIndex = this.all_options_quantity.indexOf(id);
        sides.forEach((item) => {
        const index = this.all_options_quantity.indexOf(item);
        const cur = this.matrix_com[pIndex * this.quantity + index];
        if (typeof cur !== 'number') {
            this.matrix_com[pIndex * this.quantity + index].push(weight);
        } else if (cur > 1) {
            this.matrix_com[pIndex * this.quantity + index] = [cur, weight];
        } else {
            this.matrix_com[pIndex * this.quantity + index] = weight;
        }
        });
    }
    getSpecArray(params) {
        let optionchoose = [];
        if (params.some(Boolean)) {
        optionchoose = this.getPublic(params.filter(Boolean));
        } else {
        optionchoose = this.getOptional(this.all_options_quantity);
        }
        return optionchoose;
    }
}