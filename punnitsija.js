let total = 0
let oikein = 0

const selvitä = (eripainoinen, painoero, verbose = true) => {

    const print = (viesti) => { if (verbose) console.log(viesti) }

    const peruspaino = 0
    const henkilöt = new Array(12).fill(peruspaino)
    henkilöt[eripainoinen] = painoero

    let excluded = []
    let punninta = 0

    let annettuVastausHenkilö = undefined
    let annettuVastausPaino = undefined

    const punnitse = (A, B) => {
        ++punninta
        print('\nPUNNINTA ' + punninta)
        const painoA = A.reduce((summa, index) => summa + henkilöt[index], 0)
        const painoB = B.reduce((summa, index) => summa + henkilöt[index], 0)
        const ero = painoA - painoB
        const ryhmät = '' + A + ' ja ' + B
        if (ero === 0) print(ryhmät + ' ovat samanpainoiset')
        if (ero < 0) print('' + B + ' on painavampi kuin ' + A)
        if (ero > 0) print('' + A + ' on painavampi kuin ' + B)
        return ero
    }

    let p1, p2, p3

    print('---------------------------------------------------------------------------------------')

    let groupA = [0, 1, 2, 3]
    let groupB = [4, 5, 6, 7]
    let groupC = [8, 9, 10, 11]

    const vastaaPaino = (p, i) => {
        if (i) print('Punninnan ' + i + ' perusteella ' + (p > 0 ? 'kevyempi' : 'painavampi'))
        return p > 0 ? -1 : 1
    }

    p1 = punnitse(groupA, groupB)

    // ----------------------------------------------------------
    if (p1 === 0) {

        print(
            'PÄÄTTELY: ' +
            groupA + ' ja ' + groupB
            + ' painoivat saman verran, eripainoinen on ryhmässä ' + groupC
        )
        print('Poistetaan 11 vertauksesta')
        p2 = punnitse([8, 0], [9, 10])
        if (p2 === 0) {
            print('PÄÄTTELY: henkilö on 11')
            annettuVastausHenkilö = 11
            p3 = punnitse([0], [11])
            annettuVastausPaino = vastaaPaino(p3, 3)
        }
        if (p2 !== 0) {
            //selvitäKolmesta(8, 9, 10, 0, p2)
            print('Poistetaan 9 vertauksesta')
            p3 = punnitse([8, 10], [0, 1])
            if (p3 === 0) {
                print('PÄÄTTELY: henkilö on ' + 9)
                annettuVastausHenkilö = 9
                annettuVastausPaino = vastaaPaino(p2, 2)
            } else {

                if (p2 === p3) {
                    print('PÄÄTTELY: henkilö on ' + 8)
                    annettuVastausHenkilö = 8
                    annettuVastausPaino = vastaaPaino(-p3, 3)
                } else {
                    print('PÄÄTTELY: henkilö on ' + 10)
                    annettuVastausHenkilö = 10
                    annettuVastausPaino = vastaaPaino(-p3, 3)
                }
            }
        }

    } else { // ERIPAINOISET A JA B
        print(
            'PÄÄTTELY: ' +
            'eripainoinen on jommassakummassa ryhmässä '
            + groupA + ' ja ' + groupB
        )
        excluded = excluded.concat(groupC)

        print('Vaihdetaan viimeiset alkiot A -> C, B -> A')
        const groupA2 = [0, 1, 2, 4]
        const groupC2 = [8, 9, 10, 3]
        p2 = punnitse(groupA2, groupC2)

        if (p2 === 0) {
            const REST = [...groupA, ...groupB]
                .filter(a => ![...groupA2, ...groupC2].includes(a))
            print(
                'PÄÄTTELY: ' +
                groupA2 + ' ja ' + groupC2
                + ' painoivat saman verran, eripainoinen on ryhmässä ' + REST
            )
            //console.log('REST:',REST)
            excluded = excluded.concat([...groupA2, ...groupC2])

            const a = 5, b = 6, c = 7

            print('Poistetaan 5 vertauksesta')
            p3 = punnitse([c], [b])

            //console.log('eripainoinen: ' + eripainoinen + ' p:' + p1 + '' + p2 + '' + p3)

            if (p3 === 0) {
                print('PÄÄTTELY: henkilö on ' + a)
                annettuVastausHenkilö = a
                annettuVastausPaino = vastaaPaino(p1, 1)
            } else {

                if (p1 === p3) {
                    print('PÄÄTTELY: henkilö on ' + b)
                    annettuVastausHenkilö = b
                    annettuVastausPaino = vastaaPaino(p3, 3)
                } else {
                    print('PÄÄTTELY: henkilö on ' + c)
                    annettuVastausHenkilö = c
                    annettuVastausPaino = vastaaPaino(p1, 1)
                }
            }
        } else { // p1 !== 0 ja p2 !== 0
            const REST = [...groupA, ...groupB]
                .filter(a => ![...excluded, 5, 6, 7].includes(a))
            print(
                'PÄÄTTELY: ' +
                groupA2 + ' ja ' + groupC2
                + ' olivat eripainoiset, eripainoinen on ryhmässä ' + REST
            )
            if (p1 === p2) {

                print('Punninnat 1 ja 2 vastasivat. Poistetaan 0 vertauksesta')
                p3 = punnitse([1, 3], [2, 11])
                if (p3 === 0) {
                    print('PÄÄTTELY: henkilö on ' + 0)
                    annettuVastausHenkilö = 0
                    annettuVastausPaino = vastaaPaino(-p1, 1)
                } else {
                    if (p1 === p3) {
                        print('PÄÄTTELY: henkilö on ' + 1)
                        annettuVastausHenkilö = 1
                        annettuVastausPaino = vastaaPaino(-p3, 3)
                    } else {
                        print('PÄÄTTELY: henkilö on ' + 2)
                        annettuVastausHenkilö = 2
                        annettuVastausPaino = vastaaPaino(-p1, 1)
                    }
                }
            } else {

                print('Punninnat 1 ja 2 poikkesivat. Poistetaan 2 vertauksesta')
                p3 = punnitse([3, 4], [0, 7])
                if (p1 === p3) {
                    print('PÄÄTTELY: henkilö on ' + 3)
                    annettuVastausHenkilö = 3
                    annettuVastausPaino = vastaaPaino(-p1, 1)
                } else {
                    print('PÄÄTTELY: henkilö on ' + 4)
                    annettuVastausHenkilö = 4
                    annettuVastausPaino = vastaaPaino(p1, 1)
                }


            }
        }

    }
    // ----------------------------------------------------------

    print('\n')
    print('ANTAMASI: ' + annettuVastausHenkilö + ' ja ' + annettuVastausPaino)
    const vastaushenkilö = henkilöt.findIndex(h => h !== peruspaino)
    print('VASTAUS: ' + vastaushenkilö + ' ja hän oli ' + (henkilöt[vastaushenkilö] > 0 ? 'painavampi' : 'kevyempi'))

    const henkilöOikein = annettuVastausHenkilö === eripainoinen
    const painoOikein = annettuVastausPaino === painoero
    if (henkilöOikein && painoOikein) ++oikein
    ++total

    if (!verbose && !(henkilöOikein && painoOikein)) {
        console.log('' + eripainoinen + ' ' + painoero + ' : ', (henkilöOikein && painoOikein))
    }

}

oikein = 0
total = 0

for (let i = 0; i < 12; ++i) { selvitä(i, 1, true); selvitä(i, -1, true) }
console.log('\n')
console.log('OIKEIN: ', oikein)
console.log('TOTAL: ', total)
