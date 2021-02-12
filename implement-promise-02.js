
class SimplePromise {

    constructor(executor) {
      const resolve =  (v) =>  {
        this.resolvedValue = v;
        this.state = "RESOLVED";  
        for (const fn of this.thenHandlers) {
            fn(v);
        }
      }
      this.state = null;  
      this.resolvedValue = null;
      this.thenHandlers = [];
      this.executor = executor;
      this.executor(resolve);
    }
    
    then(fn) {
        if (this.state === "RESOLVED") {
            const v = fn(this.resolvedValue);
            
            return new SimplePromise(resolve => {
               resolve(v);
            });
        } else {
            let resolver;
            const p = new SimplePromise(resolve => {
                resolver = resolve;
                // fn.then(v => resolve(v));
             });
            this.thenHandlers.push((v) => {
                const v2 = fn(v);
                resolver(v2);
            });
            return p;
        }
    }
    
    static all(promises) {
      return new SimplePromise(resolve => {
          const cPromises = promises.length;
          let cResolved = 0;
          const finalResolvedValue = new Array(cPromises);
          
          for(let i = 0; i <  cPromises; i++) {
              const p = promises[i];
              p.then(v => {
                  ++cResolved;
                  finalResolvedValue[i] = v;
                  if (cResolved === cPromises) {
                      resolve(finalResolvedValue);
                  }
              })
          }
          
      });
    }
}

function testSyncSimplePromise() {
  const p = new SimplePromise(
    resolve => {
      resolve('testSyncSimplePromise')
    }
  )
  p.then(value => {
    console.log('passed 1: ', value)
  })
  p.then(value => {
    console.log('passed 2: ', value)
  })
}
testSyncSimplePromise()
// expected output
// passed 1: testSyncSimplePromise
// passed 2: testSyncSimplePromise

function testAsyncSimplePromise() {
  const p = new SimplePromise(
    resolve => {
      setTimeout(() => {
        resolve('testAsyncSimplePromise')      
      }, 50)
    }
  )
  p.then(value => {
    console.log('passed 1: ', value)
  })
  p.then(value => {
    console.log('passed 2: ', value)
  })
}
testAsyncSimplePromise()
// expected output
// passed 1: testAsyncSimplePromise
// passed 2: testAsyncSimplePromise

function testAll() {
  const p1 = new SimplePromise(
    resolve => {
      resolve('value 1')
    }
  )
  const p2 = new SimplePromise(
    resolve => {
      setTimeout(() => {
        resolve('value 2')      
      }, 50)
    }
  )
  SimplePromise.all([p1, p2]).then(values => {
    console.log('passed: testAll length =', values.length)
    console.log('passed: testAll values = ', values.join(' '))
  })
}
testAll()
// expected output
// passed: testAll length = 2
// passed: testAll values = value 1 value 2

function testChaining() {
  const p = new SimplePromise(
    resolve => {
      resolve('value 1')
    }
  )
  p.then(v => {
    console.log('chained 1', v)
    return new SimplePromise(
      resolve => {
        setTimeout(() => {
          resolve('value 2')      
       }, 50)
      })
  }).then(v => {
    console.log('chained 2', v)
    return 'value 3'
  }).then(v => {
    console.log('chained 3', v)
  })
}
testChaining()
// expected output
// chained 1 value 1
// chained 2 value 2
// chained 3 value 3
