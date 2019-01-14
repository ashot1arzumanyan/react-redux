import * as types from '../actions/constant-types'

const initialState = {
    isLoaded: false,
    city: {
        erevan: {
            proposal: 0,
            demand: 0
        },
        ashtarak: {
            proposal: 0,
            demand: 0
        },
        aparan: {
            proposal: 0,
            demand: 0
        },
        talin: {
            proposal: 0,
            demand: 0
        },
        ararat: {
            proposal: 0,
            demand: 0
        },
        artashat: {
            proposal: 0,
            demand: 0
        },
        masis: {
            proposal: 0,
            demand: 0
        },
        vedi: {
            proposal: 0,
            demand: 0
        },
        armavir: {
            proposal: 0,
            demand: 0
        },
        vaxarshapat: {
            proposal: 0,
            demand: 0
        },
        mecamor: {
            proposal: 0,
            demand: 0
        },
        gavar: {
            proposal: 0,
            demand: 0
        },
        jambarak: {
            proposal: 0,
            demand: 0
        },
        martuni: {
            proposal: 0,
            demand: 0
        },
        sevan: {
            proposal: 0,
            demand: 0
        },
        vardenis: {
            proposal: 0,
            demand: 0
        },
        abovyan: {
            proposal: 0,
            demand: 0
        },
        byurexavan: {
            proposal: 0,
            demand: 0
        },
        exvard: {
            proposal: 0,
            demand: 0
        },
        nor_hajn: {
            proposal: 0,
            demand: 0
        },
        charencavan: {
            proposal: 0,
            demand: 0
        },
        alaverdi: {
            proposal: 0,
            demand: 0
        },
        axtala: {
            proposal: 0,
            demand: 0
        },
        tumanyan: {
            proposal: 0,
            demand: 0
        },
        shamlux: {
            proposal: 0,
            demand: 0
        },
        spitak: {
            proposal: 0,
            demand: 0
        },
        stepanavan: {
            proposal: 0,
            demand: 0
        },
        tashir: {
            proposal: 0,
            demand: 0
        },
        artik: {
            proposal: 0,
            demand: 0
        },
        gyumri: {
            proposal: 0,
            demand: 0
        },
        maralik: {
            proposal: 0,
            demand: 0
        },
        agarak: {
            proposal: 0,
            demand: 0
        },
        goris: {
            proposal: 0,
            demand: 0
        },
        dastakert: {
            proposal: 0,
            demand: 0
        },
        kapan: {
            proposal: 0,
            demand: 0
        },
        mexri: {
            proposal: 0,
            demand: 0
        },
        sisian: {
            proposal: 0,
            demand: 0
        },
        qajaran: {
            proposal: 0,
            demand: 0
        },
        ayrum: {
            proposal: 0,
            demand: 0
        },
        berd: {
            proposal: 0,
            demand: 0
        },
        dilijan: {
            proposal: 0,
            demand: 0
        },
        ijevan: {
            proposal: 0,
            demand: 0
        },
        noyemberyan: {
            proposal: 0,
            demand: 0
        },
        exegnacor: {
            proposal: 0,
            demand: 0
        },
        jermuk: {
            proposal: 0,
            demand: 0
        },
        vayq: {
            proposal: 0,
            demand: 0
        }
    },
    region: {
        erevan: {
            proposal: 0,
            demand: 0
        },
        aragacotn: {
            proposal: 0,
            demand: 0
        },
        ararat: {
            proposal: 0,
            demand: 0
        },
        armavir: {
            proposal: 0,
            demand: 0
        },
        gexarkunik: {
            proposal: 0,
            demand: 0
        },
        kotayk: {
            proposal: 0,
            demand: 0
        },
        lori: {
            proposal: 0,
            demand: 0
        },
        shirak: {
            proposal: 0,
            demand: 0
        },
        syunik: {
            proposal: 0,
            demand: 0
        },
        tavush: {
            proposal: 0,
            demand: 0
        },
        vayoc_cor: {
            proposal: 0,
            demand: 0
        }
    },
    subType: {
        panir: {
            proposal: 0,
            demand: 0
        },
        kat: {
            proposal: 0,
            demand: 0
        },
        macun: {
            proposal: 0,
            demand: 0
        },
        katnashor: {
            proposal: 0,
            demand: 0
        },
        karag: {
            proposal: 0,
            demand: 0
        },
        yux: {
            proposal: 0,
            demand: 0
        },
        garan_mis: {
            proposal: 0,
            demand: 0
        },
        khozi_mis: {
            proposal: 0,
            demand: 0
        },
        tavari_mis: {
            proposal: 0,
            demand: 0
        },
        jagari_mis: {
            proposal: 0,
            demand: 0
        },
        havi_mis: {
            proposal: 0,
            demand: 0
        },
        aqlori_mis: {
            proposal: 0,
            demand: 0
        },
        jagar: {
            proposal: 0,
            demand: 0
        },
        kov: {
            proposal: 0,
            demand: 0
        },
        hort: {
            proposal: 0,
            demand: 0
        },
        vochxar: {
            proposal: 0,
            demand: 0
        },
        gar: {
            proposal: 0,
            demand: 0
        },
        khoz: {
            proposal: 0,
            demand: 0
        },
        khochkor: {
            proposal: 0,
            demand: 0
        },
        mexr: {
            proposal: 0,
            demand: 0
        },
        mexvamom: {
            proposal: 0,
            demand: 0
        },
        propolis: {
            proposal: 0,
            demand: 0
        },
        mexvayntaniq: {
            proposal: 0,
            demand: 0
        },
        mexvamayr: {
            proposal: 0,
            demand: 0
        },
        petak: {
            proposal: 0,
            demand: 0
        },
        caxkaposhi: {
            proposal: 0,
            demand: 0
        },
        varung: {
            proposal: 0,
            demand: 0
        },
        pomidor: {
            proposal: 0,
            demand: 0
        },
        kartofil: {
            proposal: 0,
            demand: 0
        },
        kaxamb: {
            proposal: 0,
            demand: 0
        },
        sxtor: {
            proposal: 0,
            demand: 0
        },
        badrijan: {
            proposal: 0,
            demand: 0
        },
        khncor: {
            proposal: 0,
            demand: 0
        },
        tanc: {
            proposal: 0,
            demand: 0
        },
        ciran: {
            proposal: 0,
            demand: 0
        },
        nur: {
            proposal: 0,
            demand: 0
        },
        tuz: {
            proposal: 0,
            demand: 0
        },
        dzmeruk: {
            proposal: 0,
            demand: 0
        },
        limon: {
            proposal: 0,
            demand: 0
        },
        khaxox: {
            proposal: 0,
            demand: 0
        },
        mori: {
            proposal: 0,
            demand: 0
        },
        malina: {
            proposal: 0,
            demand: 0
        },
        haxarj: {
            proposal: 0,
            demand: 0
        },
        aloj: {
            proposal: 0,
            demand: 0
        },
        mosh: {
            proposal: 0,
            demand: 0
        },
        hon: {
            proposal: 0,
            demand: 0
        },
        coren: {
            proposal: 0,
            demand: 0
        },
        gari: {
            proposal: 0,
            demand: 0
        },
        kukuruz: {
            proposal: 0,
            demand: 0
        },
        grechka: {
            proposal: 0,
            demand: 0
        },
        hajar: {
            proposal: 0,
            demand: 0
        },
        chamich: {
            proposal: 0,
            demand: 0
        },
        cirani_chir: {
            proposal: 0,
            demand: 0
        },
        salori_chir: {
            proposal: 0,
            demand: 0
        },
        chor_tut: {
            proposal: 0,
            demand: 0
        },
        cirani_jem: {
            proposal: 0,
            demand: 0
        },
        khncor_jem: {
            proposal: 0,
            demand: 0
        },
        hamem: {
            proposal: 0,
            demand: 0
        },
        petrushka: {
            proposal: 0,
            demand: 0
        },
        rehan: {
            proposal: 0,
            demand: 0
        },
        aveluk: {
            proposal: 0,
            demand: 0
        },
        nana: {
            proposal: 0,
            demand: 0
        },
        mrgatu_careri: {
            proposal: 0,
            demand: 0
        },
        hataptxayin_tperi: {
            proposal: 0,
            demand: 0
        },
        banjarexenayin_buyseri: {
            proposal: 0,
            demand: 0
        }
    },
    type: {
        katnamterq: {
            proposal: 0,
            demand: 0
        },
        msamterq: {
            proposal: 0,
            demand: 0
        },
        kendaniner: {
            proposal: 0,
            demand: 0
        },
        trchunner_cu: {
            proposal: 0,
            demand: 0
        },
        ckner_ikra: {
            proposal: 0,
            demand: 0
        },
        mexvamterq: {
            proposal: 0,
            demand: 0
        },
        banjarexen: {
            proposal: 0,
            demand: 0
        },
        mirg: {
            proposal: 0,
            demand: 0
        },
        hataptux: {
            proposal: 0,
            demand: 0
        },
        grain_culture: {
            proposal: 0,
            demand: 0
        },
        ynkuzexen: {
            proposal: 0,
            demand: 0
        },
        chir_ev_charaz: {
            proposal: 0,
            demand: 0
        },
        pahaconer: {
            proposal: 0,
            demand: 0
        },
        kanachexen: {
            proposal: 0,
            demand: 0
        },
        busakan_teyer: {
            proposal: 0,
            demand: 0
        },
        tnkiner: {
            proposal: 0,
            demand: 0
        }
    }
}

const sumOf = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SUM_OF_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoaded: true
            }

        default:
            return state
    }
}

export default sumOf