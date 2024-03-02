export default {
  port: 3000,
  dbUri:
    'mongodb+srv://professionalworks78023:itJtiU7TqoF5d9xG@cluster0.3cbfscl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  saltWorkFactor: 10,

  // use RSA Private and Public key  : i.e. ____RSA Private key____, ____RSA Public Key____ 
  // if you want to use RS256 encryption for signing jWT

  publicKey: 'some-public-key',
  privateKey: 'some-public-key',
  accessTokenTtl: '15min',
  refreshTokenTtl: '1hr'
}
