export default function kmeans(sumCluster, rawData){
    var centeroidIndex = [];
    var centeroid = [];
    var dataJarak = [];
    var cluster = [];
    var loop = new Boolean(true);
    var arrCluster = [];

    // menentukan centeroid awal
    let i = 0; 
    while(i < sumCluster){
        var randomCenteroid = Math.floor(Math.random() * rawData.length);
        var sameData = centeroidIndex.includes(randomCenteroid);
        if(!sameData){
            centeroidIndex.push(randomCenteroid);
            centeroid.push(rawData[randomCenteroid]);
            i++;
        }
    }

    // console.log('Centeroid index ', centeroidIndex);
    // console.log('Centeroid ', centeroid);
    // console.log('rawData ', rawData);

    while(loop){
        dataJarak = [];
        var clusterNew = [];

        // menentukan jarak dengan centeroid menggunakan ecludian
        centeroid.forEach( function(ct, c) {
            var a = [];
            rawData.forEach( function(data, d) {
                let sum = null;
                let i = 0;
                while(i < data.length){
                    sum += (data[i] - ct[i])**2;
                    i++
                }
                let ecludian = Math.sqrt(sum);
                a.push(ecludian);
            });
            dataJarak.push(a);
        });
        // console.log('dataJarak ', dataJarak);

        //convert array data jarak 
        if(dataJarak.length != 0){
            var c = [];
            for(let a = 0; a < dataJarak[0].length; a++){
                var d = [];
                for(let b = 0; b < dataJarak.length; b++){
                    d.push(dataJarak[b][a]);
                }
                c.push(d);
            }

            //menentukan cluster dengan jarak terdekat
            for(let a = 0; a < c.length; a++){
            var min = Math.min.apply(Math, c[a]);
                for(let b = 0; b < c[a].length; b++){
                    if(c[a][b] == min){
                    clusterNew.push(b);
                    }
                }
            }
            dataJarak = [];
            dataJarak = c;        

            // console.log('dataJarak ', dataJarak);
            // console.log('cluster K-means ' + clusterNew);
        }

        //mengubah centeroid dari data rata-rata cluster
        var centeroidMove = [];
        for(let a = 0; a < centeroid.length; a++){
            var avgArr = [];
            for(let b = 0; b < centeroid[a].length; b++){
                var sum = null;
                var total = 0;
                rawData.forEach( function(data, d) {
                    if(clusterNew[d] == a){
                    // console.log('data for avg cluster '+ a + ' ' + b + ' ' + d + ' ' , data[b]);
                    sum += data[b];
                    total++;
                    }
                });
                var avg = sum / total;
                // console.log('sum ' + sum);
                // console.log('avg ' + avg);
                avgArr.push(avg);
            }
            // console.log('avgArr ' + avgArr);
            centeroidMove.push(avgArr);
        }
        // console.log('centeroidMove ', centeroidMove);
        centeroid = [];
        centeroid = centeroidMove;
        // console.log('centeroid ', centeroid);

        
        if(cluster.length != 0){
            loop = Boolean(false);
            for(let i = 0; i < cluster.length; i++){
            if(clusterNew[i] != cluster[i]){
                loop = Boolean(true);
            }
            }
            cluster = [];
            cluster = clusterNew;
        }else{
            cluster = [];
            cluster = clusterNew;
        }
    }

    //menyusun array cluster
    if(cluster.length > 0){
        for(let i = 0; i < sumCluster; i++){
            var dataCl =  [];
            var index = [];
            var dataCenteroid = [];
            rawData.forEach( function(data, d) {
                if(cluster[d] == i){
                    dataCl.push(data);
                    index.push(d);
                }
            });
            dataCenteroid = centeroid[i];
            arrCluster.push({
                centroid : dataCenteroid, 
                cluster : dataCl, 
                clusterInd : index
            });
        }
    }

    //   console.log('arrCluster ', arrCluster);
    return arrCluster;
}