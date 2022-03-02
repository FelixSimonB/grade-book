import React from 'react'
import { 
    useScrollTrigger,
    Zoom,
    Box
} from '@mui/material'

export const ScrollTop = (props) => { 
    const { children } = props
    const trigger = useScrollTrigger()
    
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        )

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    )
}

export const getFullname = (firstname, lastname) => {
    return `${firstname} ${lastname}`
}

export const roundUp = (num) => {
    var round = Math.round(num * 100) / 100
    return round
}

export const getFinalAverage = (num) => {
    var finalAverage = (num.reduce((a, b) => parseInt(a) + parseInt(b), 0) / num.filter(a => parseInt(a) !== 0).length)
    return roundUp(finalAverage) || 0
}

export const getQuarterAverage = (homework, test) => {
    var homeworkAverage = ((homework.reduce((a, b) => parseInt(a) + parseInt(b), 0) / homework.filter(a => parseInt(a) !== 0).length)) * 0.4
    var testAverage = ((test.reduce((a, b) => parseInt(a) + parseInt(b), 0) / test.filter(a => parseInt(a) !== 0).length)) * 0.6
    var quarterAverage = homeworkAverage + testAverage
    return roundUp(quarterAverage)
}

export const implode = (a) => {
    var imploded = ''
    a.forEach(function(item, index) {
        index !== a.length-1 ? imploded += `${item}%, ` : imploded += `${item}%`
    })
    return imploded
}

export const seperateGradesByQuarter = (grades) => {
    let quarters = []

    if(grades) {
        for(let x = 1; x <= 4; x++) {
            quarters[x-1] = getGradesPerQuarter(grades, x)
        }
    }

    return quarters?.filter(function(quarter) {
        return quarter?.length !== 0
    });
}

const getGradesPerQuarter = (grades, quarter) => {
    var filtered =  grades?.filter(function(grade) {
        return grade?.quarter == quarter
    })
    return filtered
}

export const translateFileToObject = (text, teacherId) => {
    var grades = []

    try {
        let splitter = ''
        if(text.search('\\r\\n') >= 0) {
            splitter = '\r\n'
        } else {
            splitter = '\n'
        }
        const perLine = text.split(splitter)
        console.log(perLine)
        let data = {}
        let quarter
        perLine.forEach(function(item, index) {
            if (item.search(/Quarter+\s+\d{1,2},\s+\d{4}/gi) >= 0) {
                if(item.replace(/[^\w\s]/gi, '').split(' ')?.[1] != undefined) {
                    quarter = item.replace(/[^\w\s]/gi, '').split(' ')?.[1]
                } else {
                    stop
                }
                return
            }

            if (data.quarter != 0 || data.quarter > 4) {
                data.quarter = quarter
                let name = item.match(/^(\w{2,}\s){2,}/gm)?.[0].trim().split(' ')
                data.firstname = name[0]
                data.lastname = name[1]
                let getGrades = item.replace(/^(\w{2,}\s){2,}/gm, '')
                let seperatedGrades = getGrades.match(/(\w\s(\d{1,3}(\s|$)){1,})/gm)
                let homework = []
                let test = []
                seperatedGrades.forEach(function(grade, index) {
                    let thisGrades = grade.trim().split(' ')
                    if(thisGrades[0] === 'H') {
                        thisGrades.shift()
                        homework = homework.concat(thisGrades)
                    } else {
                        thisGrades.shift()
                        test = test.concat(thisGrades)
                    }
                })
                homework.forEach((element, idx) => {
                    homework[idx] = parseInt(element)
                })

                test.forEach((element, idx) => {
                    test[idx] = parseInt(element)
                })
                data.homework_grades = homework
                data.test_grades = test
                data.teacher_id = teacherId
                grades.push(data)
                data = new Object()
            }
        })
        
        return grades
    } catch (error) {
        return null
    }
}