
describe('HelloWorld.vue', () => {
  it('zhongwen', function () {
    const str = `#include <iostream>
using namespace std；
class A {
int a；
public：
A(int aa=0){a=aa；}
～A( ){cout <<″Destructor A!″<<a<<endl；}
}；
class B：public A{
int b;
public:
B(int aa = 0,int bb = 0):A(aa){b = bb;}
～B( ){cout <<″Destructor B!″<< b << endl;}
};
void main( ){
B x(5),y(6,7);
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
      }
      newStr += news
    }
    console.log(newStr)
  })
})
