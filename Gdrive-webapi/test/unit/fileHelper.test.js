import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'
import Routes from './../../src/routes.js';
import fs from 'fs';
import FileHelper from '../../src/fileHelper.js';

describe('#FileHelper test suite', () => {
    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 3088098726,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 562949953923871,
                size: 37084,
                blocks: 80,
                atimeMs: 1631122854670.5508,
                mtimeMs: 1628533671484.744,
                ctimeMs: 1628533671498.6982,
                birthtimeMs: 1631122854125.8271,
                atime: '2021-09-08T17:40:54.671Z',
                mtime: '2021-08-09T18:27:51.485Z',
                ctime: '2021-08-09T18:27:51.499Z',
                birthtime: '2021-09-08T17:40:54.126Z'
              }
              const mockUser = 'hemerson';
              process.env.USER = mockUser;
              const filename = '2.PNG';
              jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename]);
              
              jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock);

            const result = await FileHelper.getFilesStatus("/tmp");
            const expectedResult = [
                {
                    size: "37.1 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ];
            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
            expect(result).toMatchObject(expectedResult);

        })
    })
})