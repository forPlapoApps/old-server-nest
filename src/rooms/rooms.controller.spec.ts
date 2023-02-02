import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('should return an array of rooms', async () => {
      const result = [
        { id: 'myFirstRoomId', name: 'room1' },
        { id: 'mySecondRoomId', name: 'room2' },
      ];
      jest
        .spyOn(service, 'findAllRooms')
        .mockImplementation(() => Promise.resolve(result));

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await controller.index(res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

  describe('show', () => {
    it('should return an object of room', async () => {
      const result = { id: 'myFirstRoomId', name: 'room1' };
      jest
        .spyOn(service, 'findRoom')
        .mockImplementation(() => Promise.resolve(result));

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await controller.show('myFirstRoomId', res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('should return notFoundError when room is empty', async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await controller.show('mySecondRoomId', res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Room not Found.' });
    });
  });
});
