const initialState = {
    common: {
        region: "",
        city: "",
        type: "",
        subType: "",
        price: "",
        unit: "",
        available_quantity: "",
        email: "",
        phone: "",
        comment: "",
        plan_to_have: "",
        quantity: "",
        when: "",
        add: "",
        oneTime: "",
        continuous: "",
        frequency: "",
        year: "",
        month: "",
        day: "",
        week: "",
        mark_the_date: "",
        username: "",
        password: "",
        repeat_password: "",
        units: {
            kg: "",
            hat: "",
            gram: "",
            tonna: ""
        }
    },
    Login: {},
    addNewDemand: {
    },
    Navigation: {
        login: "",
        register: "",
        addNewProposal: "",
        addNewDemand: ""
    },
    Filter: {
        regions: {
            erevan: "",
            aragacotn: "",
            ararat: "",
            armavir: "",
            gexarkunik: "",
            kotayk: "",
            lori: "",
            shirak: "",
            syunik: "",
            tavush: "",
            vayoc_cor: ""
        },
        cities: {
            ashtarak: "",
            aparan: "",
            talin: "",
            ararat: "",
            artashat: "",
            masis: "",
            vedi: "",
            armavir: "",
            vaxarshapat: "",
            mecamor: "",
            gavar: "",
            jambarak: "",
            martuni: "",
            sevan: "",
            vardenis: "",
            abovyan: "",
            byurexavan: "",
            exvard: "",
            nor_hajn: "",
            charencavan: "",
            alaverdi: "",
            axtala: "",
            tumanyan: "",
            shamlux: "",
            spitak: "",
            stepanavan: "",
            tashir: "",
            artik: "",
            gyumri: "",
            maralik: "",
            agarak: "",
            goris: "",
            dastakert: "",
            kapan: "",
            mexri: "",
            sisian: "",
            qajaran: "",
            ayrum: "",
            berd: "",
            dilijan: "",
            ijevan: "",
            noyemberyan: "",
            exegnacor: "",
            jermuk: "",
            vayq: ""
        },
        types: {
            katnamterq: "",
            msamterq: "",
            banjarexen: "",
            mirg: "",
            hataptux: "",
            ynkuzexen: "",
            chir_ev_charaz: "",
            pahaconer: "",
            kanachexen: "",
            tnkiner: ""
        },
        subTypes: {
            panir: "",
            kat: "",
            garan_mis: "",
            khozi_mis: "",
            khncor: "",
            tanc: "",
            ciran: "",
            khaxox: "",
            khncoreni: "",
            saloreni: "",
            tanceni: ""
        }
    }
}

const content = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LANG':
            return {
                ...state,
                ...action.payload
            }    
        default:
            return state
    }
}

export default content;