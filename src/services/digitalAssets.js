import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL || 'https://BCC4E6D5F607401CA25AF4998B9E2932.mobile.ocp.oraclecloud.com:443';
const apiUrl = url + '/mobile/custom/DigitalAssetsAPI/';
const storageUrl = url + '/mobile/platform/storage/collections/NotionalArchitectureDiagrams/objects/';
const auth = {
  username: process.env.REACT_APP_USERNAME || 'nolan.corcoran@oracle.com',
  password: process.env.REACT_APP_PASSWORD || 'SnickersMuffin3#'
}
const headers = {
  'oracle-mobile-backend-id': process.env.REACT_APP_BACKEND_ID || '87d0bbb8-6b1d-4bfa-85c2-c75d6367ef04'
}

const capitalize = word => {
  if (word === "and") return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const format = value => {
  var text;
  var words = value.split('_');
  if (words.length === 1) { text = capitalize(words[0]); }
  else {
    words = words.map(word => capitalize(word));
    text = words.join(' ');
  }
  return { value, text }
}

const getAssetDetails = (asset) => {
  var scrm_id = asset.scrm_id;
  return getHubsters(scrm_id)
    .then(hubsters => { asset['hubsters'] = hubsters; return asset; })
    .then(asset => {
      return getCloudServices(scrm_id)
        .then(cloudServices => { asset['cloudServices'] = cloudServices; return asset; })
    })
    .then(asset => {
      return getIndustries(scrm_id)
        .then(industries => { asset['industries'] = industries; return asset; })
    })
    .then(asset => {
      return getPillars(scrm_id)
        .then(pillars => { asset['pillars'] = pillars; return asset; })
    })
    .catch(error => { console.log(error); throw Error(error); });
}

export const getAllAssets = () => {
  var reqUrl = apiUrl + 'assets/all';
  return axios.get(reqUrl, { headers, auth })
    .then(result => result.data.items)
    .then(assets => {
      return assets.map(asset => {
        reqUrl = storageUrl + asset.arch_diagram_id;
        return axios.get(reqUrl, { headers, auth, responseType: 'arraybuffer' })
          .then(result => Buffer.from(result.data, 'binary').toString('base64'))
          .then(result => 'data:image/png;base64,' + result)
          .then(arch_diagram => {
            asset['arch_diagram'] = arch_diagram;
            console.log(asset);
            return asset;
          })
          .catch(error => { console.log(error); throw Error(error); });
      })
    })
    .then(promises => Promise.all(promises))
    .then(assets => assets.map(asset => getAssetDetails(asset)))
    .then(promises => Promise.all(promises))
    .catch(error => { console.log(error); throw Error(error); })
}

export const getAsset = (scrm_id) => {
  var reqUrl = apiUrl + 'assets/' + scrm_id;
  return axios.get(reqUrl, { headers, auth })
    .then(result => result.data.items[0])
    .then(asset => {
      reqUrl = storageUrl + asset.arch_diagram_id;
      return axios.get(reqUrl, { headers, auth, responseType: 'arraybuffer' })
        .then(result => Buffer.from(result.data, 'binary').toString('base64'))
        .then(result => 'data:image/png;base64,' + result)
        .then(arch_diagram => {
          asset['arch_diagram'] = arch_diagram;
          return asset;
        })
        .catch(error => { console.log(error); throw Error(error); });
    })
    .then(asset => { return getAssetDetails(asset); })
    .catch(error => { console.log(error); throw Error(error); });
}

export const getHubsters = (scrm_id) => {
  var reqUrl = apiUrl + 'hubsters/' + scrm_id;
  return axios.get(reqUrl, { headers, auth })
    .then(result => result.data.items)
    .catch(error => { console.log(error); throw Error(error); });
}

export const getCloudServices = (scrm_id) => {
  var reqUrl = apiUrl + 'cloud-services/' + scrm_id;
  return axios.get(reqUrl, { headers, auth })
    .then(result => result.data.items.map(item => format(item.cloud_service)))
    .catch(error => { console.log(error); throw Error(error); });
}

export const getIndustries = (scrm_id) => {
  var reqUrl = apiUrl + 'industries/' + scrm_id;
  return axios.get(reqUrl, { headers, auth })
    .then(result => result.data.items.map(item => format(item.industry)))
    .catch(error => { console.log(error); throw Error(error); });
}

export const getPillars = (scrm_id) => {
  var reqUrl = apiUrl + 'pillars/' + scrm_id;
  return axios.get(reqUrl, { headers, auth })
    .then(result => result.data.items.map(item => format(item.pillar)))
    .catch(error => { console.log(error); throw Error(error); });
}

export const postAsset = (assetObj) => {
  var reqUrl = apiUrl + 'assets';
  return axios.post(reqUrl, assetObj, { headers, auth })
    .then(result => result.data)
    .catch(error => { console.log(error); throw Error(error); });
}

export const postIndustry = (industryObj) => {
  var reqUrl = apiUrl + 'industries';
  return axios.post(reqUrl, industryObj, { headers, auth })
    .then(result => result.data)
    .catch(error => { console.log(error); throw Error(error); });
}

export const postCloudService = (cloudServiceObj) => {
  var reqUrl = apiUrl + 'cloud-services';
  return axios.post(reqUrl, cloudServiceObj, { headers, auth })
    .then(result => result.data)
    .catch(error => { console.log(error); throw Error(error); });
}

export const postPillar = (cloudServiceObj) => {
  var reqUrl = apiUrl + 'pillars';
  return axios.post(reqUrl, cloudServiceObj, { headers, auth })
    .then(result => result.data)
    .catch(error => { console.log(error); throw Error(error); });
}

export const postHubster = (userObj) => {
  var reqUrl = apiUrl + 'hubsters';
  return axios.post(reqUrl, userObj, { headers, auth })
    .then(result => result.data)
    .catch(error => { console.log(error); throw Error(error); });
}

/* .then(result => {return result.data.items},
  error => { console.log(error); throw Error(error); })
.then(assets => {
return assets.map(asset => {
reqUrl = storageUrl + asset.arch_diagram_id;
return axios.get(reqUrl, {headers, auth, responseType: 'arraybuffer'})
  .then(result => {return Buffer.from(result.data, 'binary').toString('base64')},
        error => { console.log(error); throw Error(error); })
  .then(result => 'data:image/png;base64,' + result)
  .then(arch_diagram => {
    asset['arch_diagram'] = arch_diagram;
    console.log(asset);
    return asset;
  })
})
})
.then(promises => {return Promise.all(promises)},
  error => { console.log(error); throw Error(error); }); */