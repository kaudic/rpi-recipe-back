import * as blockhash from 'blockhash-core';
import { imageFromBuffer, getImageData } from '@canvas/image';
import * as fs from 'fs';

// function to hash an image
export const hash = async (imgPath) => {
  const correctedPath = imgPath.replace(/\\/g, '/');
  try {
    const data = await readFileHash(correctedPath);
    console.log('data: ', data);
    const hash = await blockhash.bmvbhash(getImageData(data as any), 8);
    return hexToBin(hash);
  } catch (error) {
    console.log(error.message, correctedPath);
  }
};

// function used in hash function
export const hexToBin = (hexString) => {
  const hexBinLookup = {
    0: '0000',
    1: '0001',
    2: '0010',
    3: '0011',
    4: '0100',
    5: '0101',
    6: '0110',
    7: '0111',
    8: '1000',
    9: '1001',
    a: '1010',
    b: '1011',
    c: '1100',
    d: '1101',
    e: '1110',
    f: '1111',
    A: '1010',
    B: '1011',
    C: '1100',
    D: '1101',
    E: '1110',
    F: '1111',
  };
  let result = '';
  for (let i = 0; i < hexString.length; i++) {
    result += hexBinLookup[hexString[i]];
  }
  return result;
};

// function to readFileAndHash using previous function
export const readFileHash = (path) => {
  return new Promise((resolve, reject) => {
    console.log('READING FILE: ', path);
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(imageFromBuffer(data));
    });
  });
};
