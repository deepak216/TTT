const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const http=require('http')
const request = require('request');
const app=express()
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'dist')))



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
})

app.get('/api/data',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.query.n);
    
    var ans={};
    var finalArray=[];
    var result=[]
    if(req.query.n==0) return res.json(result);
    request.get("http://terriblytinytales.com/test.txt",(error,response,body)=>{
        body=body.split('\n');
        body=body.filter(y=>{
            if(y.length>0) return y;
        });
        
        body=body.filter(x=>{
            x=x.replace(/[?#,()>;:"]/g,"").trim()    // remove the special characters
            x=x.replace(/[\t]/g," ").trim()          // remove tab spaces
            x=x.replace(/[0-9]+./g,"").trim()       // remove number
            //x=x.replace(/[a-z]*./g).trim() 
            x=x.replace(/[.\/\@]/g," ");            // remove / ,@
            x=x.trim();
            var temp=x.split(' ');
            temp.forEach(element => {
                if(element.length==0){

                }
                else if(ans.hasOwnProperty(element)){
                    ans[element]+=1;
                }
                else{
                    ans[element]=1;
                }
            });
            return x;
        });
        finalArray=Object.keys(ans).map((key)=>{
            return {
                word:key,
                count:ans[key]
            };
        });
        finalArray.sort((a,b)=>{
            return b.count-a.count;
        })
        //console.log(finalArray);
        result[0]=finalArray[0];        
        var preElement=finalArray[0];
        //console.log(preElement);
        var n=(req.query.n)-1;        
        var j=0;
        for(var i=1;i<finalArray.length;i++){
            if(n==0)
            break;
            if(finalArray[i].count!=preElement.count)
            {               
                j++;
                n--;
            }
            else{
                j++;
            }
            result[j]=finalArray[i];
            preElement=finalArray[i];
        }
        //console.log(result);
        return res.json(result);
        res.setHeader('Access-Control-Allow-Origin', '*');    // solves cors issue by allowing request from any source
    })
    
})
app.set('port',3000)

const server=http.createServer(app)

server.listen(3000,()=>console.log("running on port 3000"))          // server listening at port 3000