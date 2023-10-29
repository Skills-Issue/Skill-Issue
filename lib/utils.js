export function sortSkills(rolelistingData, userData, ascending){
    let newListing = []
    let returnListing = []
    for (let i = 0; i < rolelistingData.length; i++) {
        let count = 0
        for (let j = 0; j < userData.length; j++) {
            
            if (rolelistingData[i].skills.includes(userData[j].skill_name)) {
                count++
            }
        }
        newListing.push([rolelistingData[i], count/rolelistingData[i].skills.length])
    }
    if (ascending) {
        newListing.sort((a, b) => a[1] - b[1])
    } else {
        newListing.sort((a, b) => b[1] - a[1])
    }
    for (let i=0; i<newListing.length; i++) {
        returnListing.push(newListing[i][0])
    }
    return returnListing
}