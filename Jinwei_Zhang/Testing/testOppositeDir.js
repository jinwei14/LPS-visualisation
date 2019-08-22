function oppositeDir (item1,item2){
    dir1 = [item1[0],item1[1]];
    dir2 = [item2[0],item2[1]];
    angle = Math.acos(dir1[0]*dir2[0] + dir1[1]*dir2[1]);
    console.log(angle);
    return angle === Math.PI / 2 || angle === -Math.PI / 2;
}



console.log(oppositeDir([Math.sqrt(2)/2,Math.sqrt(2)/2],[1,0]));
console.log(Math.acos(1));
