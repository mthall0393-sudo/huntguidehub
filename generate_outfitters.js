// Node script to generate outfitters.json from outfitters-data.md
const fs = require('fs');
const data = fs.readFileSync('outfitters-data.md','utf8');
// Mapping of state names to abbreviations
const stateAbbrev = {
  Colorado: 'CO', Wyoming: 'WY', Texas: 'TX', Kansas: 'KS', Ohio: 'OH', Iowa: 'IA', Illinois: 'IL', Missouri: 'MO', Alabama: 'AL', Louisiana: 'LA', Arkansas: 'AR', Michigan: 'MI'
};
// Coordinates for cities (city, stateAbbrev) -> {lat,lng}
const coordMap = {
  'Colorado Springs,CO': {lat:38.8339,lng:-104.8214},
  'Steamboat Springs,CO': {lat:40.4858,lng:-106.8317},
  'Alamosa,CO': {lat:37.4683,lng:-105.8740},
  'Boulder,CO': {lat:40.01499,lng:-105.2705},
  'Gunnison,CO': {lat:38.5455,lng:-106.9285},
  'Denver,CO': {lat:39.7392,lng:-104.9903},
  'Craig,CO': {lat:40.5158,lng:-107.5500},
  'Grand Junction,CO': {lat:39.0639,lng:-108.5506},
  'Durango,CO': {lat:37.2753,lng:-107.8801},
  'Lander,WY': {lat:42.8322,lng:-108.7305},
  'Casper,WY': {lat:42.85,lng:-106.3253},
  'Jackson,WY': {lat:43.4799,lng:-110.7624},
  'Dubois,WY': {lat:44.1745,lng:-108.6746},
  'Douglas,WY': {lat:42.8828,lng:-105.9845},
  'Laramie,WY': {lat:41.3114,lng:-105.5911},
  'Cody,WY': {lat:44.5269,lng:-109.0560},
  'Cheyenne,WY': {lat:41.139,lng:-104.8202},
  'Eastland,TX': {lat:32.4024,lng:-98.8226},
  'San Antonio,TX': {lat:29.4241,lng:-98.4936},
  'Jacksboro,TX': {lat:33.2245,lng:-98.1587},
  'Vera,TX': {lat:30.2366,lng:-97.5692},
  'Denton,TX': {lat:33.2148,lng:-97.1331},
  'Turkey,TX': {lat:31.1155,lng:-96.5286},
  'Coleman,TX': {lat:31.8263,lng:-99.4251},
  'Santa Cruz,TX': {lat:31.8221,lng:-96.3322},
  'Hays,KS': {lat:38.8792,lng:-99.3276},
  'Dodge City,KS': {lat:37.7528,lng:-100.0171},
  'Hutchinson,KS': {lat:38.0608,lng:-97.9298},
  'Salina,KS': {lat:38.8403,lng:-97.6114},
  'Wichita,KS': {lat:37.6872,lng:-97.3301},
  'Lawrence,KS': {lat:38.9717,lng:-95.2353},
  'Topeka,KS': {lat:39.0473,lng:-95.6752},
  'Emporia,KS': {lat:38.4039,lng:-96.5878},
  'Manhattan,KS': {lat:39.1836,lng:-96.5717},
  'Columbus,OH': {lat:39.9612,lng:-82.9988},
  'Dayton,OH': {lat:39.7589,lng:-84.1916},
  'Cleveland,OH': {lat:41.4993,lng:-81.6944},
  'Springfield,OH': {lat:39.9289,lng:-83.8088},
  'Toledo,OH': {lat:41.6528,lng:-83.5379},
  'Cincinnati,OH': {lat:39.1031,lng:-84.5120},
  'Marietta,OH': {lat:39.4226,lng:-81.4559},
  'Des Moines,IA': {lat:41.5868,lng:-93.6250},
  'Fairfield,IA': {lat:41.0129,lng:-91.9632},
  'Cedar Rapids,IA': {lat:42.0083,lng:-91.6441},
  'Davenport,IA': {lat:41.5236,lng:-90.5776},
  'Sioux City,IA': {lat:42.5005,lng:-96.4003},
  'Ames,IA': {lat:42.0308,lng:-93.6319},
  'Dubuque,IA': {lat:42.5006,lng:-90.6646},
  'Council Bluffs,IA': {lat:41.2619,lng:-95.8608},
  'Mason City,IA': {lat:43.1545,lng:-93.2100},
  'Waterloo,IA': {lat:42.4928,lng:-92.3426},
  'Springfield,IL': {lat:39.7817,lng:-89.6501},
  'Bloomington,IL': {lat:40.4842,lng:-88.9937},
  'Peoria,IL': {lat:40.6936,lng:-89.5890},
  'Champaign,IL': {lat:40.1164,lng:-88.2434},
  'Rockford,IL': {lat:42.2711,lng:-89.0937},
  'Carbondale,IL': {lat:37.7272,lng:-89.2168},
  'Decatur,IL': {lat:39.8403,lng:-88.9548},
  'Joliet,IL': {lat:41.5250,lng:-88.0817},
  'Quincy,IL': {lat:39.9356,lng:-90.6488},
  'Naperville,IL': {lat:41.7508,lng:-88.1535},
  'Springfield,MO': {lat:37.2089,lng:-93.2923},
  'Branson,MO': {lat:36.6430,lng:-93.2182},
  'Jefferson City,MO': {lat:38.5767,lng:-92.1735},
  'St. Louis,MO': {lat:38.6270,lng:-90.1994},
  'Kansas City,MO': {lat:39.0997,lng:-94.5786},
  'Columbia,MO': {lat:38.9517,lng:-92.3341},
  'Rolla,MO': {lat:37.9514,lng:-91.7713},
  'Cape Girardeau,MO': {lat:37.3059,lng:-89.5182},
  'Joplin,MO': {lat:37.0842,lng:-94.5133},
  'St. Joseph,MO': {lat:39.7670,lng:-94.8467},
  'Birmingham,AL': {lat:33.5186,lng:-86.8104},
  'Mobile,AL': {lat:30.6954,lng:-88.0399},
  'Montgomery,AL': {lat:32.3792,lng:-86.3077},
  'Huntsville,AL': {lat:34.7304,lng:-86.5861},
  'Tuscaloosa,AL': {lat:33.2098,lng:-87.5692},
  'Auburn,AL': {lat:32.6099,lng:-85.4808},
  'Dothan,AL': {lat:31.2232,lng:-85.3905},
  'Fairhope,AL': {lat:30.5215,lng:-87.9022},
  'Selma,AL': {lat:32.4074,lng:-86.9534},
  'Decatur,AL': {lat:32.3763,lng:-87.1280},
  'Lafayette,LA': {lat:30.2241,lng:-92.0198},
  'New Orleans,LA': {lat:29.9511,lng:-90.0715},
  'Lake Charles,LA': {lat:30.2266,lng:-93.2174},
  'Baton Rouge,LA': {lat:30.4515,lng:-91.1871},
  'Shreveport,LA': {lat:32.5252,lng:-93.7502},
  'Monroe,LA': {lat:32.5093,lng:-92.1193},
  'Houma,LA': {lat:29.5958,lng:-90.7180},
  'Alexandria,LA': {lat:31.3113,lng:-92.4451},
  'Opelousas,LA': {lat:30.5399,lng:-92.1020},
  'Little Rock,AR': {lat:34.7465,lng:-92.2896},
  'Fayetteville,AR': {lat:36.0626,lng:-94.1574},
  'Pine Bluff,AR': {lat:34.2284,lng:-91.9732},
  'Hot Springs,AR': {lat:34.5037,lng:-93.0552},
  'Jonesboro,AR': {lat:35.8423,lng:-90.7043},
  'Texarkana,AR': {lat:33.4251,lng:-94.0477},
  'Conway,AR': {lat:35.0539,lng:-92.4015},
  'El Dorado,AR': {lat:33.2074,lng:-92.6668},
  'Siloam Springs,AR': {lat:36.1884,lng:-94.5405},
  'Grand Rapids,MI': {lat:42.9634,lng:-85.6681},
  'Detroit,MI': {lat:42.3314,lng:-83.0458},
  'Marquette,MI': {lat:46.5436,lng:-87.3956},
  'Lansing,MI': {lat:42.7325,lng:-84.5555},
  'Traverse City,MI': {lat:44.7666,lng:-85.6200},
  'Saginaw,MI': {lat:43.4195,lng:-83.9508},
  'Petoskey,MI': {lat:45.3758,lng:-84.9565},
  'Ann Arbor,MI': {lat:42.2808,lng:-83.7430}
};

// Parse markdown tables
const lines = data.split('\n');
let currentState = null;
let results = [];
for(let i=0;i<lines.length;i++){
  const line = lines[i].trim();
  const stateHeader = line.match(/^##\s+(.*)\s+-\s+(.+)/);
  if(stateHeader){
    currentState = stateHeader[1]; // e.g., Colorado
    continue;
  }
  // Table rows start with | Name |
  if(line.startsWith('|') && !line.includes('---')){
    const cols = line.split('|').map(c=>c.trim()).filter(c=>c);
    if(cols.length>=5 && currentState){
      const [name, city, website, species, price] = cols;
      const stateAb = stateAbbrev[currentState]||'';
      const key = `${city},${stateAb}`;
      const coord = coordMap[key] || {lat:0,lng:0};
      results.push({name, city, state:stateAb, lat:coord.lat, lng:coord.lng, website, species, priceRange:price});
    }
  }
}
fs.writeFileSync('outfitters.json', JSON.stringify(results, null, 2));
console.log('Generated outfitters.json with', results.length, 'entries');
