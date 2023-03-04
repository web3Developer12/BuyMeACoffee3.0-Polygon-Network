import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk5ODI1MGE5N0YzZTE2NGZiRWNCMjFiOUY1Q2NhNWYxMjg2MGI0MDgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzM4ODAxNDYxODAsIm5hbWUiOiJnb2Z1bmRtZSJ9.a3vV_RBJghp9WK0D3SrS9QfcKb4yjRutzJ4AYZHzOTY"
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}

export default async function storeFiles (file,refLoader) {

    if(file != undefined){
      refLoader.current.continuousStart()
      const client = makeStorageClient()
      const cid = await client.put(file)
      refLoader.current.complete()
      return cid
    }
}