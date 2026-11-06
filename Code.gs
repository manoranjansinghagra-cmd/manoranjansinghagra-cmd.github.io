const SHEET_NAME = 'SiteActivity';
// Private administrator credentials. Change these before deployment if you want your own values.
const ADMIN_USER_ID = 'manoranjan.admin';
const ADMIN_PASSWORD = 'CHANGE_THIS_BEFORE_DEPLOYMENT';
const SESSION_TTL_SECONDS = 21600; // 6 hours

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'latest';
    // Public read-only dashboard data. No admin key is exposed to visitors.
    if (action === 'latest') return json({ok:true,data:getLatest()});
    if (action === 'history') return json({ok:true,data:getHistory(30)});
    // Legacy key auth is disabled. Login is POST-only and returns a short-lived session token.
    if (action === 'auth') return json({ok:false,error:'Login must use POST'});
    return json({ok:false,error:'Unknown action'});
  } catch (err) { return json({ok:false,error:String(err)}); }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.action === 'login') {
      if (body.userId !== ADMIN_USER_ID || body.password !== ADMIN_PASSWORD) return json({ok:false,error:'Invalid credentials'});
      const token = Utilities.getUuid();
      CacheService.getScriptCache().put('site_admin_' + token, ADMIN_USER_ID, SESSION_TTL_SECONDS);
      return json({ok:true,token:token,expiresIn:SESSION_TTL_SECONDS});
    }
    if (!isAuthorized(body.token || '')) return json({ok:false,error:'Unauthorized'});
    if (body.action !== 'save' || !body.data) return json({ok:false,error:'Invalid request'});
    saveUpdate(body.data);
    return json({ok:true,message:'Saved'});
  } catch (err) { return json({ok:false,error:String(err)}); }
}

function isAuthorized(token) { return token !== '' && !!CacheService.getScriptCache().get('site_admin_' + token); }

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Timestamp','Reporting Date','Project','RAG','Planned %','Actual %','Manpower','Equipment','Focus','Remark','Activity JSON']);
  }
  return sh;
}

function saveUpdate(d) {
  const sh = getSheet();
  sh.appendRow([new Date(), d.date || '', d.project || '', d.rag || '', Number(d.planned||0), Number(d.actual||0), Number(d.manpower||0), Number(d.equipment||0), d.focus || '', d.remark || '', JSON.stringify(d.rows || [])]);
}

function getLatest() {
  const sh = getSheet();
  const last = sh.getLastRow();
  if (last < 2) return null;
  const r = sh.getRange(last,1,1,11).getValues()[0];
  return {project:r[2],date:formatDate(r[1]),rag:r[3],planned:r[4],actual:r[5],manpower:r[6],equipment:r[7],focus:r[8],remark:r[9],rows:JSON.parse(r[10] || '[]')};
}

function getHistory(n) {
  const sh = getSheet(); const last = sh.getLastRow(); if (last < 2) return [];
  const start = Math.max(2,last-n+1); const vals=sh.getRange(start,1,last-start+1,11).getValues();
  return vals.map(r=>({timestamp:String(r[0]),date:formatDate(r[1]),project:r[2],rag:r[3],planned:r[4],actual:r[5],manpower:r[6],equipment:r[7],focus:r[8],remark:r[9],rows:JSON.parse(r[10]||'[]')}));
}
function formatDate(v){return v instanceof Date ? Utilities.formatDate(v,Session.getScriptTimeZone(),'yyyy-MM-dd') : String(v||'');}
function json(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
