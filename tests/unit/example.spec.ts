
describe('HelloWorld.vue', () => {
  it('zhongwen', function () {
    const str = `#include<iostream.h>
    template<class T>
class f{
private：T x，y；
public：void f1(T a，T b){x=a；y=b；}
T max( ){retum(x>y)?x:y;}
}；
main( ){
f a；
a.f1(1.5,3.8)；    ’
cout<<a.x<<a.y<<a.max( )<<endl；
}`
    let newStr = ''
    for (const s of str) {
      let news = s
      if (s === '；') {
        news = ';'
      } else if (s === '：') {
        news = ':'
      } else if (s === '″') {
        news = '"'
      } else if (s === '，') {
        news = ','
      } else if (s === '～') {
        news = '~'
      } else if (s === '＆') {
        news = '&'
      } else if (s === '．') {
        news = '.'
      } else if (s === '’') {
        news = '\''
      }
      newStr += news
    }
    console.log(newStr)
  })
})
