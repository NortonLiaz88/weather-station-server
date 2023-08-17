import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MqttClient, connect } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  public mqttClient: MqttClient;

  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(MqttService.name);

  async onModuleInit() {
    const host = this.configService.get<string>('MQTT_HOST');
    const port = this.configService.get<string>('PORT');
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    const connectUrl = `mqtt://${host}:${port}`;
    const topic = '/norton/tcc/+/topic';

    this.mqttClient = await connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.mqttClient.on('connect', () => {
      this.logger.log('Connected to CloudMQTT');
    });

    this.mqttClient.on('error', function () {
      this.logger.error('Error in connecting to CloudMQTT');
    });
  }

  publish(topic: string, payload: string): string {
    this.logger.log(`Publishing to ${topic}`);
    this.mqttClient.publish(topic, payload);
    return `Publishing to ${topic}`;
  }

  subscribe(topic: string) {
    this.mqttClient.subscribe(topic, () => {
      this.mqttClient.publish(topic, 'Olá');
    });
  }

  onMessage() {
    this.mqttClient.on('message', (topic, message) => {
      return { topic, message };
    });
  }
}
